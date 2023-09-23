<?php

namespace App\Http\Controllers\Api\Order;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use App\Models\Product;
use App\Models\Settings;
use Symfony\Component\HttpKernel\Exception\HttpException;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return OrderResource::collection(Order::paginate(25));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreOrderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreOrderRequest $request)
    {
        try {
            //busca el último valor del orderNumber
            $settings = Settings::find('1');
            $order_number = $settings["value"] + 1;

            //crea la cabecera de la orden
            $order = Order::create([
                ...$request->validated(),
                'order_number' => $order_number,
            ]);

            // Obtén los detalles del request y calcula el amount
            $detailsData = $request->input('details');
            for ($i = 0; $i < count($detailsData); $i++) {
                $product = Product::find($detailsData[$i]["id_product"]);
                $detailsData[$i]["amount"] = $product->price * $detailsData[$i]["quantity"];
            }

            // Crea los detalles asociados a la orden
            $order->details()->createMany($detailsData);

            $settings->value = $order_number;
            $settings->save();

            return response()->json([
                'message' => 'Producto y detalles creados con éxito',
                'product' => new OrderResource($order),
            ], 201);

        } catch(\Exception $exception) {
            throw new HttpException(400, "Invalid data - {$exception->getMessage()}");
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        return new OrderResource($order);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateOrderRequest  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        if (!$order->id) {
            throw new HttpException(400, "Invalid id");
        }

        try {
            $order = Order::find($order->id);
            $order->fill($request->validated())->save();

            // Obtén los detalles del request y calcula el amount
            $detailsData = $request->input('details');
            if (count($detailsData)) {
                foreach ($detailsData as $detail) {
                    $id = $detail["id"];
                    $id_product = $detail["id_product"];
                    $quantity = $detail["quantity"];

                    $product = Product::find($id_product);
                    $amount = $product->price * $quantity;

                    $order->details()->updateOrInsert(['id' => $id], [
                        'id_product' => $id_product,
                        'quantity' => $quantity,
                        'amount' => $amount,
                    ]);
                }
            }

            return new OrderResource($order);

        } catch(\Exception $exception) {
           throw new HttpException(400, "Invalid data - {$exception->getMessage()}");
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        $order->details()->delete();
        $order->delete();

        return response()->json(null, 204);
    }
}
