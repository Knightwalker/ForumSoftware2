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
}
