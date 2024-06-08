import { createContext, useState } from "react";  

const ThemeContext = createContext();

const ThemeProviderWrapper = props => {

    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }

        //ternary option
        //theme === 'light' ? setTheme('dark') : setTheme('light')
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
};

export {ThemeContext, ThemeProviderWrapper};