<?php

Auth::routes();


Route::group(['middleware' => ['auth']], function(){

    Route::get('/photos', 'GalleryController@getPhotos');

    Route::post('/photos', 'GalleryController@uploadPhotos');

    Route::delete('/photos', 'GalleryController@deletePhoto');

    Route::get('/logout', 'Auth\LoginController@logout');

    Route::get('/galleries', 'GalleryMainController@getGalleries');

    Route::get('{all?}', 'GalleryController@index')->where('all', '([A-z\d-\/_.]+)?');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
