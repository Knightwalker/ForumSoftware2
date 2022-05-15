<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index(Request $request) {
        $request->headers->set('Accept', 'application/json');
        return Product::all();
    }

    public function create(Request $request) {
        $request->headers->set('Accept', 'application/json');

        $request->validate([
            "name" => "required",
            "slug" => "required",
            "price" => "required"
        ]);

        return Product::create($request->all());
        // return Product::create([
        //     "name" => "Product One",
        //     "slug" => "product-one",
        //     "description" => "This is product one",
        //     "price" => "99.99",
        // ]);
    }

    /**
    * Get the specified resource in storage.
    *
    * @param \Illuminate\Http\Request $request 
    * @param int $id
    * @return \Illuminate\Http\Response  
    */
    public function getById(Request $request, $id) {
        $request->headers->set('Accept', 'application/json');

        return Product::find($id);
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

        $product = Product::find($id);
        $product->update($request->all());
        return $product;
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

        return Product::destroy($id);
    }

    /**
    * Search the specified resource in storage.
    *
    * @param \Illuminate\Http\Request $request 
    * @param str $name
    * @return \Illuminate\Http\Response  
    */
    public function searchByName(Request $request, $name) {
        $request->headers->set('Accept', 'application/json');

        return Product::where("name", "like", "%".$name."%")->get();
    }

}
