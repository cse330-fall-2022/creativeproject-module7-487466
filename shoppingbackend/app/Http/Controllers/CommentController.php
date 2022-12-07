<?php

namespace App\Http\Controllers;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    //
    function addComment(Request $req) {
        $comment = new Comment;
        $comment->comment = $req->input('comment');
        $comment->item_id = $req->input('item_id');
        $comment->commenter_id = $req->input('commenter_id');
        $comment->commenter = $req->input('commenter');
        $comment->save();
        return $comment;
    }

    function listComments($item_id) {
        $comment = Comment::all()->where('item_id', $item_id);
        return $comment;

    }

    function deleteComments($item_id) {
        $result = Comment::where('item_id', $item_id)->delete();
        if($result) {
            return ["result"=>"product has been deleted"];
        }
        else {
            return ["result"=>"error"];
        }
    }
}
