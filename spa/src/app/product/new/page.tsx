"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product } from "@/models/product";
import styles from "./page.module.scss";

export default function NewProductPage() {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
  });

  const [domLoaded, setDomLoaded] = useState(false);

  const router = useRouter();

  const onAddProduct = async (product: Product): Promise<void> => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      };
      const response = await fetch(
        "http://127.0.0.1:8000/api/products",
        requestOptions
      );
      const result = await response.json();
      if (result) {
        router.push("/product");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Llamar a la función para añadir el producto
    onAddProduct(product);
    // Limpiar el formulario después de enviar
    setProduct({ name: "", description: "", price: 0 });
  };

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded && (
        <div className={styles.poduct}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="description">Descripción:</label>
              <textarea
                id="description"
                name="description"
                value={product.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="price">Precio:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit">Añadir Producto</button>
          </form>
          <Link href="/product">Ir atrás</Link>
        </div>
      )}
    </>
  );
}
