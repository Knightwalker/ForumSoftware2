<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IdentityController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public Routes
Route::post("/identity/register", [IdentityController::class, "register"]);
Route::post("/identity/login", [IdentityController::class, "login"]);
Route::get("/identity/getallusers", [IdentityController::class, "getAllUsers"]);
Route::get("/forums/getall", [ForumController::class, "getall"]);
Route::get("/forums/getbyid/{id}", [ForumController::class, "getById"])->where('id', '[0-9]+');
Route::get("/topics/getbyid/{id}", [TopicController::class, "getById"])->where('id', '[0-9]+');
Route::get("/posts/getbyid/{id}", [PostController::class, "getById"])->where('id', '[0-9]+');

Route::post("/products/create", [ProductController::class, "create"]);
Route::get("/products/getById/{id}", [ProductController::class, "getById"]);
Route::put("/products/updateById/{id}", [ProductController::class, "updateById"]);
Route::delete("/products/deleteById/{id}", [ProductController::class, "deleteById"]);
Route::get("/products/searchByName/{name}", [ProductController::class, "searchByName"]);

// Protected Routes
Route::group(["middleware" => ["auth:sanctum"]], function() {
    Route::post("/identity/logout", [IdentityController::class, "logout"]);
    Route::get("/identity/getbytoken", [IdentityController::class, "getByToken"]);
    Route::put("/identity/updatebytoken", [IdentityController::class, "updateByToken"]);
    Route::post("/forums/create", [ForumController::class, "create"]);
    Route::put("/forums/updatebyid/{id}", [ForumController::class, "updateById"])->where('id', '[0-9]+');
    Route::delete("/forums/deletebyid/{id}", [ForumController::class, "deleteById"])->where('id', '[0-9]+');
    Route::post("/topics/create", [TopicController::class, "create"]);
    Route::put("/topics/updatebyid/{id}", [TopicController::class, "updateById"])->where('id', '[0-9]+');
    Route::delete("/topics/deletebyid/{id}", [TopicController::class, "deleteById"])->where('id', '[0-9]+');
    Route::post("/posts/create", [PostController::class, "create"]);
    Route::put("/posts/updatebyid/{id}", [PostController::class, "updateById"])->where('id', '[0-9]+');
    Route::delete("/posts/deletebyid/{id}", [PostController::class, "deleteById"])->where('id', '[0-9]+');

    Route::get("/products", [ProductController::class, "index"]);
});
