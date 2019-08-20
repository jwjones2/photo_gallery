<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $table = 'galleries';

    // one to many with photos
    public function photos () {
        return $this->hasMany('App\Photo', 'gallery_id', 'id');
    }
}
