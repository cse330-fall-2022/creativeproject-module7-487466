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
        $item->seller = $req->input('seller');
        $item->save();
        return $item;
    }
    //
    function list() {
        return Item::all();
    }

    function delete($name) {
        $result = Item::where('item', $name)->delete();
        if($result) {
            return ["result"=>"product has been deleted"];
        }
        else {
            return ["result"=>"error"];
        }
    }

    function viewItem($name) {
        return Item::find($name);
    }

}
