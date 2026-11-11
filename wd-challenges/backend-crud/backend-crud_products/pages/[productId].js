import useSWR from "swr";
import styled from "styled-components";
import { useRouter } from "next/router";
import StyledLink from "@/components/Link";
import Reviews from "@/components/Reviews";
import ProductRating from "@/components/ProductRating";
import ReviewForm from "@/components/ReviewForm";
import { useState } from "react";
import ProductForm from "@/components/ProductForm";
import Button from "@/components/Button";

export default function Product() {
  const router = useRouter();
  const { productId } = router.query;
  console.log("router.query", router.query);
  const [isEditProductMode, setIsEditProductMode] = useState(false);

  const { data, isLoading, mutate } = useSWR(`/api/products/${productId}`);

  async function handleProductEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      mutate();
      setIsEditProductMode(!isEditProductMode);
    }
  }

  async function handleProductDelete() {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return router.push("/");
    }

    return console.error(response.status);
  }

  async function handleReviewSubmit(event) {
    event.preventDefault();

    const reviewData = Object.fromEntries(new FormData(event.target));
    const response = await fetch(`/api/products/${productId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    if (response.ok) {
      mutate();
      event.target.reset();
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  console.log("data", data);
  return (
    <>
      <ProductCard>
        <h2>
          {data.name} <ProductRating product={data} />
        </h2>
        <p>Description: {data.description}</p>
        <p>
          Price: {data.price} {data.currency}
        </p>
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
          }}
        >
          <Button
            type="button"
            onClick={() => {
              setIsEditProductMode(!isEditProductMode);
            }}
          >
            ✏️ Edit
          </Button>
          <Button type="button" onClick={handleProductDelete}>
            ❌ Delete
          </Button>
        </section>
        {isEditProductMode && (
          <ProductForm
            data={data}
            onSubmit={handleProductEdit}
            heading="Edit this fish"
          />
        )}
        <StyledLink href="/">Back to all</StyledLink>
      </ProductCard>
      <Reviews onMutate={mutate} reviews={data.reviews} productId={productId} />
      <hr />
      <ReviewForm
        onSubmit={handleReviewSubmit}
        productId={productId}
        heading="Write a review"
      />
    </>
  );
}

export const ProductCard = styled.article`
  padding: 0.5rem 1rem 1rem;
  box-shadow: 0px 1px 5px -2px var(--color-granite);
`;
