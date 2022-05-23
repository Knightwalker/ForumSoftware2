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
            ->with(["children"])
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
}
