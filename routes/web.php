<?php

Auth::routes();


Route::group(['middleware' => ['auth']], function(){

    Route::get('/photos', 'GalleryController@getPhotos');

    Route::post('/photos', 'GalleryController@uploadPhotos');

    Route::delete('/photos', 'GalleryController@deletePhoto');

    Route::get('/logout', 'Auth\LoginController@logout');

    Route::get('/galleries', 'GalleryMainController@getGalleries');

    Route::get('/event', 'GalleryMainController@show');

    Route::post('/event', 'GalleryMainController@update');

    Route::post('/new_event', 'GalleryMainController@store');

    Route::get('{all?}', 'GalleryController@index')->where('all', '([A-z\d-\/_.]+)?');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
