
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const MAX_QUANTITY = 99;

const normalizeId = (id) => (id == null ? "" : String(id));

const getCartItemId = (productId, color = "", size = "") =>
  JSON.stringify([
    normalizeId(productId),
    String(color || ""),
    String(size || ""),
  ]);

const getItemCartId = (item) =>
  item.cartItemId ||
  getCartItemId(item.productId ?? item.id, item.color, item.size);

export const useStore = create(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      deliveryArea: "inside-dhaka",

      // Delivery area
      setDeliveryArea: (area) => {
        if (!["inside-dhaka", "outside-dhaka"].includes(area)) return;

        set({ deliveryArea: area });
      },

      // Add product to cart
      addToCart: (product, quantity = 1) => {
        if (
          !product?.id ||
          !Number.isInteger(quantity) ||
          quantity < 1 ||
          !Number.isFinite(Number(product.price)) ||
          Number(product.price) < 0
        ) {
          return;
        }

        const productId = normalizeId(product.id);
        const color = product.selectedColor || product.color || "";
        const size = product.selectedSize || product.size || "";

        const cartItemId = getCartItemId(productId, color, size);

        set((state) => {
          const existing = state.cart.find(
            (item) => getItemCartId(item) === cartItemId
          );

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                getItemCartId(item) === cartItemId
                  ? {
                      ...item,
                      quantity: Math.min(
                        (Number(item.quantity) || 0) + quantity,
                        MAX_QUANTITY
                      ),
                    }
                  : item
              ),
            };
          }

          return {
            cart: [
              ...state.cart,
              {
                cartItemId,
                productId,
                name: product.name || "",
                slug: product.slug || "",
                categoryPath: Array.isArray(product.categoryPath)
                  ? product.categoryPath
                  : [],
                image: product.image || "",
                price: Number(product.price),
                color,
                size,
                quantity: Math.min(quantity, MAX_QUANTITY),
              },
            ],
          };
        });
      },

      // Remove one specific cart item / variant
      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => getItemCartId(item) !== String(itemId)
          ),
        })),

      // Update quantity of a specific cart item / variant
      updateQuantity: (itemId, quantity) => {
        if (!Number.isInteger(quantity)) return;

        if (quantity < 1) {
          set((state) => ({
            cart: state.cart.filter(
              (item) => getItemCartId(item) !== String(itemId)
            ),
          }));

          return;
        }

        set((state) => ({
          cart: state.cart.map((item) =>
            getItemCartId(item) === String(itemId)
              ? {
                  ...item,
                  quantity: Math.min(quantity, MAX_QUANTITY),
                }
              : item
          ),
        }));
      },

      clearCart: () => set({ cart: [] }),

      // Wishlist
      toggleWishlist: (product) => {
        if (!product?.id) return;

        const productId = normalizeId(product.id);

        set((state) => {
          const exists = state.wishlist.some(
            (item) => normalizeId(item.id) === productId
          );

          return {
            wishlist: exists
              ? state.wishlist.filter(
                  (item) => normalizeId(item.id) !== productId
                )
              : [
                  ...state.wishlist,
                  {
                    id: productId,
                    name: product.name || "",
                    slug: product.slug || "",
                    categoryPath: Array.isArray(product.categoryPath)
                      ? product.categoryPath
                      : [],
                    image: product.image || "",
                    price: Number(product.price) || 0,
                  },
                ],
          };
        });
      },

      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter(
            (item) => normalizeId(item.id) !== normalizeId(productId)
          ),
        })),

      clearWishlist: () => set({ wishlist: [] }),
    }),
    {
      name: "store-cart-wishlist",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        deliveryArea: state.deliveryArea,
      }),
    }
  )
);

// Cart selectors
export const selectCartCount = (state) =>
  state.cart.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

export const selectCartSubtotal = (state) =>
  state.cart.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

// Wishlist selector
export const selectWishlistCount = (state) => state.wishlist.length;
