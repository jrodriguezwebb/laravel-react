<?php

namespace Database\Seeders;

use Database\Seeders\OrderDetailSeeder;
use Database\Seeders\OrderSeeder;
use Database\Seeders\ProductSeeder;
use Database\Seeders\SettingsSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserSeeder::class,
            ProductSeeder::class,
            OrderSeeder::class,
            OrderDetailSeeder::class,
            SettingsSeeder::class,
        ]);
    }
}
