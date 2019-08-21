<?php

namespace App\Http\Controllers;

use App\Image;
use App\Event;
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
        $images = Event::find($request->input('id'))->images;
        return response()->json($images->toArray());
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
        $eventId = $request->get('gallery_id');
        if($path){
            $create = Image::create([
                'uri'      => $path,
                'public'   => false,
                'height'   => $height,
                'width'    => $width,
                'event_id' => $eventId 
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
        $photo = Image::find($request->id);
        if(Storage::disk('public')->delete($photo->uri) && $photo->delete()){
            return response()->json([
                'deleted' => true
            ]);
        }
    }

}
