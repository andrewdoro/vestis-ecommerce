import React, { useState, useEffect } from "react";
import { Card, Typography, CardContent, Button, Box, Skeleton, } from "@mui/material";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../features/cartSlice";

import Tilt from "react-parallax-tilt";
import colors from "../../../constants/colors";
const Product = ({ product }) => {
   const dispatch = useDispatch();
   const [state, setState] = useState({
      animate: false,
      added: false,
      color: product.variant_groups[1].options[0],
      loaded: false
   });
   const { animate, added } = state;
   const colorOptions = product.variant_groups[1].options;
   const cart = useSelector((state) => state.cart.cart);
   useEffect(() => {
      cart.line_items.map(
         (item) =>
            item.product_id === product.id &&
            setState((prevState) => ({ ...prevState, added: true }))
      );
   }, [cart, product]);

   const buyAnimate = () => {
      setState((prevState) => ({ ...prevState, animate: true, added: true }));
      setTimeout(() => setState((prevState) => ({ ...prevState, animate: false })), 400);
   };
   const buyAnimationElement = () => {
      return (
         <>
            <Box
               sx={{
                  position: "absolute",
                  width: "100%",
                  height: animate ? "100%" : "0%",
                  transition: "0.3s cubic-bezier(0.5, 1, 0.89, 1)",
                  bottom: 0,
                  borderRadius: "10px",
                  backgroundColor: "secondary.main",
                  zIndex: 1,
               }}></Box>
            <Box
               sx={{
                  position: "absolute",
                  width: "20px",
                  transform: `scale(${added ? 1 : 0})`,
                  height: "20px",
                  borderRadius: "50%",
                  margin: "16px",
                  transition: "0.3s cubic-bezier(0.5, 1, 0.89, 1) .5s",
                  top: 0,
                  right: 0,
                  backgroundColor: "secondary.main",
                  zIndex: 1,
               }}></Box>
         </>
      )
   }

   return (

      <Card sx={{
         backgroundColor: "transparent",
         width: "100%",
         position: "relative",
         transition: ".4s",
         overflow: "hidden",
      }} variant="contained">

         {buyAnimationElement()}
         <Link to={`/product/${product.id}`}>
            <Tilt
               sx={{
                  transformStyle: "preserve-3d",
                  transform: "perspective(1000px)",
               }}
               tiltEnable={isMobile ? false : true}
               glareMaxOpacity={0.5}
               tiltReverse={true}
               tiltMaxAngleX={7}
               tiltMaxAngleY={7}
               transitionSpeed={1500}>
               {!state.loaded && (
                  <Skeleton variant="rectangular" width="100%" sx={{ height: ["60vh", "50vh"], }} />
               )}
               <Box component="img"
                  onLoad={() => setState((prevState) => ({ ...prevState, loaded: true }))}
                  sx={{ height: ["60vh", "50vh"], display: state.loaded ? "block" : "none", width: "100%", borderRadius: "10px", objectFit: "cover", objectPosition: "top center" }}
                  src={product.media.source}
                  alt={product.name}></Box>
            </Tilt>
         </Link>
         <CardContent >
            <Typography variant="subtitle1" noWrap sx={{ fontWeight: "500" }}>
               {product.name}
            </Typography>
            <Card variant="flex" flex="row" sx={{ justifyContent: "flex-start", mb: 0.25 }}>
               {colorOptions.map((color) => {
                  return (
                     <Box key={color.id} sx={{ width: "30px", mr: 1, height: "10px", backgroundColor: colors[color.name.toLowerCase()] }} />
                  )
               })}
            </Card>
            <Typography variant="body1">€{product.price.formatted}</Typography>
         </CardContent>
         <Button
            color="secondary"
            variant="outlined"
            sx={{ width: "100%", borderRadius: "10px" }}
            onClick={() => {
               buyAnimate();
               const defaultVariant = {
                  [product.variant_groups[0].id.toString()]:
                     product.variant_groups[0].options[0].id.toString(),
                  [product.variant_groups[1].id.toString()]:
                     product.variant_groups[1].options[0].id.toString(),
               };
               dispatch(addItem({ productId: product.id, variant: defaultVariant }));
            }}
            size="medium">
            <AddShoppingCartIcon />
         </Button>
      </Card>


   );
};

export default Product;
