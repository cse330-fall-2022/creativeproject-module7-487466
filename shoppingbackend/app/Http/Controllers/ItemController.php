<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Item;


class ItemController extends Controller
{
    function addItem(Request $req) {
        $item = new Item;
        $item->item = $req->input('item');
        $item->description = $req->input('description');
        $item->price = $req->input('price');
        $item->image = $req->input('image');
        $item->seller_id = $req->input('seller_id');
        $item->category = $req->input('category');
        $item->save();
        return $item;
    }
    //
    function list() {
        return Item::all();
    }

    function delete($id) {
        $result = Item::where('id', $id)->delete();
        if($result) {
            return ["result"=>"product has been deleted"];
        }
        else {
            return ["result"=>"error"];
        }
    }

    function viewItem($id) {
        return Item::find($id);
    }

    function updateItem($id, Request $req) {

        $item = Item::find($id);

       $item->item=$req->input('name');
        $item->description=$req->input('description');
        $item->price=$req->input('price');
        $item->category = $req->input('category');
        $item->image=$req->input('image');
        $item->save();
        return $item;
        }
        
    function userItems($user_id) {
        return Item::all()->where('seller_id', $user_id);
    }

    function filter($category) {
        return Item::all()->where('category', $category);
    }


}
