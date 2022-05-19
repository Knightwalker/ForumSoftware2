<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IdentityController;
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

Route::post("/products/create", [ProductController::class, "create"]);
Route::get("/products/getById/{id}", [ProductController::class, "getById"]);
Route::put("/products/updateById/{id}", [ProductController::class, "updateById"]);
Route::delete("/products/deleteById/{id}", [ProductController::class, "deleteById"]);
Route::get("/products/searchByName/{name}", [ProductController::class, "searchByName"]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Protected Routes
Route::group(["middleware" => ["auth:sanctum"]], function() {
    Route::post("/identity/logout", [IdentityController::class, "logout"]);
    
    Route::get("/products", [ProductController::class, "index"]);
});
