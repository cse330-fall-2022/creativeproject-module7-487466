<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    function addItem(Request $req) {
        $item = new Product;
        $item->item = $req->input('item');
        $item->description = $req->input('description');
        $item->price = $req->input('price');
        $item->image = $req->input('image');
        $item->seller = $req->input('seller');
        $item->save();
        return $item;
    }
}
