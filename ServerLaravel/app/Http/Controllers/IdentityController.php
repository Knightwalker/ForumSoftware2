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
        $request->headers->set('Accept', 'application/json');
        $data = $request->all(); // Get the request input data as an array.
        
        // Step 1. Validate
        $validator = Validator::make($data, [
                "username" => "required|max:255|unique:users,username",
                "email" => "required|email|max:255|unique:users,email",
                "password" => "required|max:255"
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'msg'    => 'Error',
                'errors' => $validator->errors(),
            ], 422);
        }

        // Step 2. Insert default values
        $data["image_url"] = $data["image_url"] ?? "https://2img.net/u/1614/38/46/76/avatars/100-26.jpg";
 
        // Step 3. Register
        $user = new User;
        $user->username = $data["username"];
        $user->email = $data["email"];
        $user->password = $data["password"];
        $user->image_url = $data["image_url"];
 
        try {
            $user->save();
            return response($user, 201);
        } catch (\Exception $ex) {
            return response()->json([
                'status' => 'error',
                'msg'    => $ex->getMessage(),
                'errors' => []
            ], 422);
        }

    }

    /**
    * Logins the user.
    *
    * @param \Illuminate\Http\Request $request 
    * @return \Illuminate\Http\Response  
    */
    public function login(Request $request) {
        $request->headers->set('Accept', 'application/json');
        
        // Step 1. Validate
        $validator = Validator::make($request->all(), [
                "username" => "required|max:255",
                "password" => "required|max:255"
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'msg'    => 'Error',
                'errors' => $validator->errors(),
            ], 422);
        }
 
        // Step 2. Check Username
        $user = User::where("username", $request["username"])->first();
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'msg'    => 'User does not exist'
            ], 401);
        }

        // Step 3. Check Password
        if (!Hash::check($request["password"], $user->password)) {
            return response()->json([
                'status' => 'error',
                'msg'    => 'Password does not match'
            ], 401);
        }

        // Step 4. Login
        $token = $user->createToken("myapptoken")->plainTextToken;

        return response()->json([
            "user"  => $user,
            "token" => $token
        ], 201);
    }

    /**
    * Logouts the user.
    *
    * @param \Illuminate\Http\Request $request 
    * @return \Illuminate\Http\Response  
    */
    public function logout(Request $request) {
        auth()->user()->tokens()->delete(); 

        return response()->json([
            'status' => 'success',
            'msg'    => 'Logged Out'
        ], 200);
    }

}