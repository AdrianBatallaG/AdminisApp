<?php

namespace App\Enums;

enum UserRole: string
{
    case USER = 'user';
    case EDITOR = 'editor';
    case ADMIN = 'admin';
}
