<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class IdentityController extends Controller
{
 /**
    * Registers the user.
    *
    * @param \Illuminate\Http\Request $request 
    * @return \Illuminate\Http\Response  
    */
    public function register(Request $request) {
        $request->headers->set("Accept", "application/json");
        $data = $request->all(); // Get the request input data as an array.
        
        // Step 1. Validate
        $validator = Validator::make($data, [
                "username" => "required|max:255|unique:users,username",
                "email"    => "required|email|max:255|unique:users,email",
                "password" => "required|max:255|confirmed", // requires the payload to have `password_confirmation` field. The magic happens by design
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
        $data["password"] = Hash::make($data["password"]);
        $data["image_url"] = $data["image_url"] ?? "https://2img.net/u/1614/38/46/76/avatars/100-26.jpg";
        $data["role"] = 0; // 0=user, 1=admin

        // Step 3. Register
        $user = new User;
        $user->username = $data["username"];
        $user->email = $data["email"];
        $user->password = $data["password"];
        $user->image_url = $data["image_url"];
        $user->role = $data["role"];
 
        try {
            $user->save();
            return response()->json([
                "status"     => "success",
                "statusCode" => 201,
                "message"    => "Registered successfully",
                "data"       => $user
            ], 201);
        } catch (\Exception $ex) {
            return response()->json([
                "status"  => "error",
                "statusCode" => 500,
                "message" => $ex->getMessage(),
                "errorsArr"  => ["General server error"]
            ], 500);
        }

    }

    /**
    * Logins the user.
    *
    * @param \Illuminate\Http\Request $request 
    * @return \Illuminate\Http\Response  
    */
    public function login(Request $request) {
        $request->headers->set("Accept", "application/json");
        
        // Step 1. Validate
        $validator = Validator::make($request->all(), [
                "username" => "required|max:255",
                "password" => "required|max:255"
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                "status" => "error",
                "statusCode" => 422,
                "message"    => "Validation Failed",
                "errors" => $validator->errors(),
                "errorsArr" => $validator->errors()->all()
            ], 422);
        }
 
        // Step 2. Check Username
        $user = User::where("username", $request["username"])->first();
        if (!$user) {
            return response()->json([
                "status"  => "error",
                "statusCode" => 401,
                "message" => "User does not exist",
                "errorsArr" => ["User does not exist"]
            ], 401);
        }

        // Step 3. Check Password
        if (!Hash::check($request["password"], $user->password)) {
            return response()->json([
                "status" => "error",
                "statusCode" => 401,
                "message"=> "Password does not match",
                "errorsArr" => ["Password does not match"]
            ], 401);
        }

        // Step 4. Login
        $token = $user->createToken("myapptoken")->plainTextToken;

        return response()->json([
            "status" => "success",
            "message" => "Logged In",
            "user"  => $user,
            "token" => $token
        ], 200);
    }

    /**
    * Logouts the user.
    *
    * @param \Illuminate\Http\Request $request 
    * @return \Illuminate\Http\Response  
    */
    public function logout(Request $request) {
        // $request->headers->set("Accept", "application/json");
        auth()->user()->tokens()->delete(); 
        
        return response()->json([
            "status"     => "success",
            "statusCode" => 200,
            "message"    => "Logged Out"
        ], 200);
    }

}
