<?php

namespace App\Http\Controllers;

use App\Photos;
use App\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index(){
        return view('app');
    }

    public function getPhotos(Request $request)
    {
        // takes an gallery id and returns the photos for that gallery 
        $gallery = Gallery::find(1);
        return response()->json($gallery->photos()->toArray());
    }

    public function uploadPhotos(Request $request)
    {
        $file = $request->file('file');
        $ext = $file->extension();
        $name = str_random(20).'.'.$ext ;
        list($width, $height) = getimagesize($file);
        $path = Storage::disk('public')->putFileAs(
            'uploads', $file, $name
        );
        if($path){
            $create = Auth::user()->photos()->create([
                'uri' => $path,
                'public' => false,
                'height' => $height,
                'width' => $width
            ]);

            if($create){
                return response()->json([
                    'uploaded' => true
                ]);
            }
        }
    }

    public function deletePhoto(Request $request)
    {
        $photo = Photos::find($request->id);
        if(Storage::disk('public')->delete($photo->uri) && $photo->delete()){
            return response()->json([
                'deleted' => true
            ]);
        }
    }

}
