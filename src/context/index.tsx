import React, { ReactElement, useEffect } from "react";
import { ProductsContextProvider } from "./ProductsContext";
import { NotificationContextProvider } from "./NotificationContext";
import { BasketContextProvider } from "./BasketContext";
import { createTheme, ThemeProvider } from "@mui/material";
import { ShopContextProvider } from "./ShopContext";
import { SnackbarProvider } from "notistack";
import { UserContextProvider } from "./UserContext";
import { useNavigate } from "react-router-dom";


const theme = createTheme({
	palette: {
		primary: {
			light: "#fffd61",
			main: "#ffca28",
			dark: "#c79a00",
			contrastText: "#000",
		},
		secondary: {
			light: "#d7ffd9",
			main: "#a5d6a7",
			dark: "#75a478",
			contrastText: "#000"
		},
		text: {
			primary: "#000",
			secondary: "rgba(0,0,0,0.6)",
		}
	}
});



const AppContextProvider: React.FC<{children: ReactElement}> = ({children}) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("redirectUrl") !== null) {
			navigate(localStorage.getItem("redirectUrl") as string)
			localStorage.removeItem("redirectUrl")
		}
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<ShopContextProvider>
				<UserContextProvider>
					<ProductsContextProvider>
						{/*<NotificationContextProvider>*/}
							<BasketContextProvider>
								<SnackbarProvider maxSnack={5} variant="success" autoHideDuration={1500}>
										{children}
								</SnackbarProvider>
							</BasketContextProvider>
						{/*</NotificationContextProvider>*/}
					</ProductsContextProvider>
				</UserContextProvider>
			</ShopContextProvider>
		</ThemeProvider>
	)
}


export default AppContextProvider;
