<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Topic;

class TopicController extends Controller
{
    public function create(Request $request) {
        $request->headers->set('Accept', 'application/json');
        $data = $request->all(); // Get the request input data as an array.
        $user_id = auth('sanctum')->user()->id;

        // Step 1. Validate
        $validator = Validator::make($data, [
            "name"        => "required",
            "description" => "required",
            "forum_id"    => "required"
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                "status"     => "error",
                "statusCode" => 422,
                "message"    => "Validation failed",
                "errors"     => $validator->errors(),
                "errorsArr"  => $validator->errors()->all()
            ], 422);
        }
     
        // Step 2. Transform data
        $data["user_id"] = $user_id;
        $data["forum_id"] = intval($data["forum_id"]);

        $topic = new Topic;
        $topic->name = $data["name"];
        $topic->description = $data["description"];
        $topic->forum_id = $data["forum_id"];
        $topic->user_id = $data["user_id"];
        $topic->save();

        return response()->json([
            "status"     => "success",
            "statusCode" => 201,
            "message"    => "Created",
            "data"       => $topic
        ], 201);
    }

    /**
    * Gets one topic with posts by id.
    *
    * @param \Illuminate\Http\Request $request 
    * @param int $id
    */
    public function getById(Request $request, $id) {
        $request->headers->set('Accept', 'application/json');  
        $id = intval($id);  

        $topic = Topic::where("id", "=", $id)
            ->with(["posts" => function ($query) {
                $query->with(["user"]);
            }])
            ->with(["user"])
            ->first();

        return response()->json([
            "status"     => "success",
            "statusCode" => 200,
            "message"    => "success",
            "data"       => $topic
        ], 200);
    }

    /**
    * Update the specified resource in storage.
    *
    * @param \Illuminate\Http\Request $request 
    * @param int $id
    * @return \Illuminate\Http\Response  
    */
    public function updateById(Request $request, $id) {
        $request->headers->set('Accept', 'application/json');
        $data = $request->all(); // Get the request input data as an array.
        $user_id = auth('sanctum')->user()->id;

        // Step 1. Validate
        // Check if the user did NOT create this topic.
        $topic = Topic::find($id);
        if ($user_id != $topic->user_id) {
            return response()->json([
                "status"     => "error",
                "statusCode" => 403,
                "message"    => "Sorry, we were unable to update this topic. You can only edit topics you authored."
            ], 403);
        }

        // Step 2. Update
        $topic->update($data);
        return response()->json([
            "status"     => "success",
            "statusCode" => 200,
            "message"    => "You have successfully updated this topic!",
            "data"       => $topic
        ], 200);
    }

        /**
    * Delete the specified resource in storage.
    *
    * @param \Illuminate\Http\Request $request 
    * @param int $id
    * @return \Illuminate\Http\Response  
    */
    public function deleteById(Request $request, $id) {
        $request->headers->set('Accept', 'application/json');
        $user_id = auth('sanctum')->user()->id;

        // Step 1. Validate
        $topic = Topic::withCount("posts")->find($id);
        // Check if the topic does NOT exist
        if ($topic == null) {
            return response()->json([
                "status"     => "error",
                "statusCode" => 404,
                "message"    => "Sorry, we were unable to find this topic. The topic with id \"" . $id . "\" does not exist."
            ], 404);
        }
        // Check if the user did NOT create this topic.
        if ($user_id != $topic->user_id) {
            return response()->json([
                "status"     => "error",
                "statusCode" => 403,
                "message"    => "Sorry, we were unable to delete this topic. You can only delete topics you authored."
            ], 403);
        }
        // If `topics` has 1 or more `posts` then restrict deleting `topic`.
        if ($topic->posts_count > 0) {
            return response()->json([
                "status"     => "error",
                "statusCode" => 400,
                "message"    => "Sorry, we were unable to delete this topic. You must first move or delete all posts inside this topic."
            ], 400);
        } 

        // Step 2. Delete
        $isDeleted = Topic::destroy($id);
        if ($isDeleted == false) {
            return response()->json([
                "status"     => "error",
                "statusCode" => 404,
                "message"    => "Not Found",
            ], 404);
        }

        return response()->json([
            "status"     => "success",
            "statusCode" => 200,
            "message"    => "You have successfully deleted this topic!",
        ], 200);
    }

}
