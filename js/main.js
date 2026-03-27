const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;
const themeIcon = document.getElementById("theme-icon");


// moon icon

const moonIcon = `
<path
d="M21 12.79A9 9 0 0111.21 3
a7 7 0 100 14
A9 9 0 0121 12.79z"
stroke="currentColor"
stroke-width="2"
stroke-linecap="round"
stroke-linejoin="round"
/>
`;


// sun icon

const sunIcon = `
<circle cx="12" cy="12" r="5"
stroke="currentColor"
stroke-width="2"
/>

<line x1="12" y1="1" x2="12" y2="3"
stroke="currentColor"
stroke-width="2"/>

<line x1="12" y1="21" x2="12" y2="23"
stroke="currentColor"
stroke-width="2"/>

<line x1="4.22" y1="4.22"
x2="5.64" y2="5.64"
stroke="currentColor"
stroke-width="2"/>

<line x1="18.36" y1="18.36"
x2="19.78" y2="19.78"
stroke="currentColor"
stroke-width="2"/>

<line x1="1" y1="12"
x2="3" y2="12"
stroke="currentColor"
stroke-width="2"/>

<line x1="21" y1="12"
x2="23" y2="12"
stroke="currentColor"
stroke-width="2"/>

<line x1="4.22" y1="19.78"
x2="5.64" y2="18.36"
stroke="currentColor"
stroke-width="2"/>

<line x1="18.36" y1="5.64"
x2="19.78" y2="4.22"
stroke="currentColor"
stroke-width="2"/>
`;


// 初始化模式

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light")
{
    htmlElement.setAttribute("data-theme", "light");
    themeIcon.innerHTML = sunIcon;
}
else
{
    themeIcon.innerHTML = moonIcon;
}


// 點擊切換

themeToggle.addEventListener("click", () =>
{
    const currentTheme = htmlElement.getAttribute("data-theme");

    if (currentTheme === "light")
    {
        htmlElement.removeAttribute("data-theme");

        localStorage.setItem("theme", "dark");

        themeIcon.innerHTML = moonIcon;
    }
    else
    {
        htmlElement.setAttribute("data-theme", "light");

        localStorage.setItem("theme", "light");

        themeIcon.innerHTML = sunIcon;
    }
});