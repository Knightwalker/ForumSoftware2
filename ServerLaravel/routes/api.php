<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegisterController;

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

Route::get("/products", [ProductController::class, "index"]);
Route::post("/products/create", [ProductController::class, "create"]);
Route::get("/products/getById/{id}", [ProductController::class, "getById"]);
Route::put("/products/updateById/{id}", [ProductController::class, "updateById"]);
Route::delete("/products/deleteById/{id}", [ProductController::class, "deleteById"]);
Route::get("/products/searchByName/{name}", [ProductController::class, "searchByName"]);

Route::post("/identity/register", [RegisterController::class, "register"]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
