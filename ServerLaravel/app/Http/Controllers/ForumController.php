<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Forum;

class ForumController extends Controller
{
    public function getall(Request $request) {
        $request->headers->set('Accept', 'application/json');

        $forumsArr = Forum::where("parent_id", "=", null)
            ->with(["children" => function ($query) {
                $query->withCount(["topics", "posts"]);
            }])
            ->with(["topics"])
            ->get();

        return response()->json([
            "status"     => "success",
            "statusCode" => 200,
            "message"    => "All Forums",
            "data"       => $forumsArr
        ], 200);
    }

    public function create(Request $request) {
        $request->headers->set('Accept', 'application/json');
        $data = $request->all(); // Get the request input data as an array.
        $user_id = auth('sanctum')->user()->id;

        // Step 1. Validate
        $validator = Validator::make($data, [
            "type" => "required",
            "name"    => "required",
            "description" => "required"
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
        $data["parent_id"] = $data["parent_id"] ?? null;
        $data["user_id"] = $user_id;
        $data["image_url"] = $data["image_url"] ?? "https://i.servimg.com/u/f97/13/74/09/43/erza_d13.jpg";

        $forum = new Forum;
        $forum->parent_id = $data["parent_id"];
        $forum->type = $data["type"];
        $forum->name = $data["name"];
        $forum->description = $data["description"];
        $forum->user_id = $data["user_id"];
        $forum->image_url = $data["image_url"];
        $forum->save();

        return response()->json([
            "status"     => "success",
            "statusCode" => 201,
            "message"    => "Created",
            "data"       => $forum
        ], 201);

    }

    /**
    * Gets one forum with topics by id.
    *
    * @param \Illuminate\Http\Request $request 
    * @param int $id
    */
    public function getById(Request $request, $id) {
        $request->headers->set('Accept', 'application/json');  
        $id = intval($id);  

        $forum = Forum::where("id", "=", $id)
            ->with(["topics" => function ($query) {
                $query
                    ->with(["posts"])
                    ->with(["user"]);
            }])
            ->with(["user"])
            ->first();

        return response()->json([
            "status"     => "success",
            "statusCode" => 200,
            "message"    => "success",
            "data"       => $forum
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
        // Check if the user did NOT create this forum.
        $forum = Forum::find($id);
        if ($user_id != $forum->user_id) {
            return response()->json([
                "status"     => "error",
                "statusCode" => 403,
                "message"    => "Sorry, we were unable to update this forum. You can only edit forums you authored."
            ], 403);
        }

        // Step 2. Update
        $forum->update($data);
        return response()->json([
            "status"     => "success",
            "statusCode" => 200,
            "message"    => "You have successfully updated this forum!",
            "data"       => $forum
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
        $forum = Forum::withCount("children", "topics")->find($id);
        // Check if the forum does NOT exist
        if ($forum == null) {
            return response()->json([
                "status"     => "error",
                "statusCode" => 404,
                "message"    => "Sorry, we were unable to find this forum. The forum with id \"" . $id . "\" does not exist."
            ], 404);
        }
        // Check if the user did NOT create this forum.
        if ($user_id != $forum->user_id) {
            return response()->json([
                "status"     => "error",
                "statusCode" => 403,
                "message"    => "Sorry, we were unable to delete this forum. You can only delete forums you authored."
            ], 403);
        }
        // Check constraint table->foreign("parent_id")->references("id")->on("forums")->onDelete("restrict");
        // If `forum` has 1 or more `children` then restrict deleting `forum`.
        if ($forum->children_count > 0) {
            return response()->json([
                "status"     => "error",
                "statusCode" => 400,
                "message"    => "Sorry, we were unable to delete this forum. You must first move or delete all children forums."
            ], 400);
        } 
        // Check constraint ???;
        // If `forum` has 1 or more `topics` then restrict deleting `forum`.
        if ($forum->topics_count > 0) {
            return response()->json([
                "status"     => "error",
                "statusCode" => 400,
                "message"    => "Sorry, we were unable to delete this forum. You must first move or delete all topics inside this forum."
            ], 400);
        } 

        // Step 2. Delete
        $isDeleted = Forum::destroy($id);
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
            "message"    => "You have successfully deleted this forum!",
        ], 200);
    }

}
