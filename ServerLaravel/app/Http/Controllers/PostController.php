<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Post;

class PostController extends Controller
{
    public function create(Request $request) {
        $request->headers->set('Accept', 'application/json');
        $data = $request->all(); // Get the request input data as an array.
        $user_id = auth('sanctum')->user()->id;

        // Step 1. Validate
        $validator = Validator::make($data, [
            "name"        => "required",
            "content"     => "required",
            "topic_id"    => "required"
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
        $data["topic_id"] = intval($data["topic_id"]);

        $post = new Post;
        $post->name = $data["name"];
        $post->content = $data["content"];
        $post->topic_id = $data["topic_id"];
        $post->user_id = $data["user_id"];
        $post->save();

        return response()->json([
            "status"     => "success",
            "statusCode" => 201,
            "message"    => "Created",
            "data"       => $post
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

        $post = Post::where("id", "=", $id)
            ->with(["user"])
            ->first();

        return response()->json([
            "status"     => "success",
            "statusCode" => 200,
            "message"    => "success",
            "data"       => $post
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
        // Check if the user did NOT create this post.
        $post = Post::find($id);
        if ($user_id != $post->user_id) {
            return response()->json([
                "status"     => "error",
                "statusCode" => 403,
                "message"    => "Sorry, we were unable to update this post. You can only edit posts you authored."
            ], 403);
        }

        // Step 2. Update
        $post->update($data);
        return response()->json([
            "status"     => "success",
            "statusCode" => 200,
            "message"    => "You have successfully updated this post!",
            "data"       => $post
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
        $post = Post::find($id);
        // Check if the post does NOT exist
        if ($post == null) {
            return response()->json([
                "status"     => "error",
                "statusCode" => 404,
                "message"    => "Sorry, we were unable to find this post. The post with id \"" . $id . "\" does not exist."
            ], 404);
        }
        // Check if the user did NOT create this post.
        if ($user_id != $post->user_id) {
            return response()->json([
                "status"     => "error",
                "statusCode" => 403,
                "message"    => "Sorry, we were unable to delete this post. You can only delete posts you authored."
            ], 403);
        }

        // Step 2. Delete
        $isDeleted = Post::destroy($id);
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
            "message"    => "You have successfully deleted this post!",
        ], 200);
    }

}
