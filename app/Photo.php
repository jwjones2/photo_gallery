<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    protected $table = 'photos';

    protected $fillable = ['uri', 'public', 'height', 'width'];

    public function gallery () {
        return $this->belongsTo('App\Gallery');
    }
}
