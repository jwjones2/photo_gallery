<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['uri', 'public', 'height', 'width', 'event_id'];

    public function event() {
        return $this->belongsTo('App\Event', 'id', 'event_id');
    }
}
