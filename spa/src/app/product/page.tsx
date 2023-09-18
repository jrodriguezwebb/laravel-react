"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/models/product";
import Link from "next/link";

export default function ProductPage() {
  const [products, setProducts] = useState<Array<Product>>([]);

  const [domLoaded, setDomLoaded] = useState(false);

  const router = useRouter();

  const handleClick = (): void => {
    router.push("/product/new");
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/products");
      const result = await response.json();
      setProducts(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteHandler = (id: number | undefined) => {
    return async () => {
      if (confirm("¿Realmente deseas borrar el registro?") == true && id) {
        try {
          const requestOptions = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          };
          await fetch(
            `http://127.0.0.1:8000/api/products/${id}`,
            requestOptions
          );
          fetchData();
        } catch (error) {
          console.error("Error sending data:", error);
        }
      }
    };
  };

  useEffect(() => {
    setDomLoaded(true);
    fetchData();
  }, []);

  return (
    <>
      {domLoaded && (
        <div className={styles.poduct}>
          <p>Productos</p>

          <button onClick={handleClick}>Agregar</button>

          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.name}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>
                      <Link href={`/product/edit/${product.id}`}>Editar</Link> |
                      <span onClick={deleteHandler(product.id)}>Borrar</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
