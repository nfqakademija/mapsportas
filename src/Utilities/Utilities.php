<?php

namespace App\Utilities;

use Symfony\Component\HttpFoundation\File\UploadedFile;

class Utilities
{
    public static function upload(UploadedFile $file, $directory)
    {
        $fileName = md5(uniqid()).'.'.$file->guessExtension();
        $file->move(
            $directory,
            $fileName
        );
        return $fileName;
    }
}