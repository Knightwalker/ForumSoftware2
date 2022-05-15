<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class RegisterController extends Controller
{
    /**
    * Create the specified resource in storage.
    *
    * @param \Illuminate\Http\Request $request 
    * @return \Illuminate\Http\Response  
    */
    public function register(Request $request) {
        $request->headers->set('Accept', 'application/json');

        $this->validate($request, [
            "username" => "required|max:255",
            "email" => "required|email|max:255",
            "password" => "required|max:255"
        ]);

        $user = User::create([
            "username" => $request->username,
            "email" => $request->email,
            "password" => Hash::make($request->password),
            "image_url" => $request->image_url
        ]);

        return $user;
    }
}
