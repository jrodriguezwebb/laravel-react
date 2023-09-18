"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product } from "@/models/product";
import styles from "./page.module.scss";

export default function EditProductPage({
  params,
}: {
  params: { id: number };
}) {
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
  });

  const [domLoaded, setDomLoaded] = useState(false);

  const router = useRouter();

  const onAddProduct = async (product: Product): Promise<void> => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      };
      const response = await fetch(
        `http://127.0.0.1:8000/api/products/${params.id}`,
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
    setProduct({ name: "", description: "" });
  };

  useEffect(() => {
    setDomLoaded(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/products/${params.id}`
        );
        const result = await response.json();
        setProduct(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]);

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
            <button type="submit">Modificar Producto</button>
          </form>
          <Link href="/product">Ir atrás</Link>
        </div>
      )}
    </>
  );
}
