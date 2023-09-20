<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::insert([
            [
                'name' => 'pan 240g',
                'description' => 'Barra de pan de 240 gramos',
                'price' => 1.20,
            ],
            [
                'name' => 'hogaza 280g',
                'description' => 'pan hogaza de 280 gramos',
                'price' => 1.40,
            ],
        ]);
    }
}
