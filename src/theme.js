import { responsiveFontSizes } from "@mui/material";
import { createTheme } from "@mui/material/styles";

let theme = createTheme({

   typography: {
      fontFamily: ["Poppins", "Roboto", '"Helvetica Neue"', "Arial", "sans-serif"].join(","),
      subtitle1: {
         fontWeight: "500",
      },
      h2: {
         fontWeight: 700
      },
      h4: {
         fontWeight: "500"
      },
      h3: {
         fontWeight: "700"
      },
      h5: {
         fontWeight: "500"
      },
      h6: {
         fontWeight: "600"
      }
   },
   palette: {
      primary: {
         main: "#d35400",
      },
      secondary: {
         main: "#d35400",
      },
      background: {
         paper: "#ecf0f1",
      },
      white: {
         main: "#ecf0f1"
      }
   },

   components: {
      MuiAppBar: {
         styleOverrides: {
            root: {
               boxShadow: "none",
            },
         },
      },
      MuiCard: {
         styleOverrides: {
            root: {
               borderRadius: "10px"
            },
         },

         variants: [
            {
               props: { variant: "flex", },
               style: {
                  display: "flex",
                  boxShadow: "none",
                  background: "transparent",
                  borderRadius: 0,
                  padding: 0,
                  overflow: "visible",

               }
            },
            {
               props: { variant: "flex", flex: "row" },
               style: {
                  display: "flex",
                  boxShadow: "none",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "visible",

               }
            },
            {
               props: { variant: "flex", flex: "column" },
               style: {
                  display: "flex",
                  boxShadow: "none",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "visible",
               }
            }
         ]
      },
      MuiList: {
         styleOverrides: {
            root:
            {
               padding: 0
            }
         }
      }
   },
});

theme = responsiveFontSizes(theme);

export default theme;
