const html = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

const moon = `
<path
    fill="currentColor"
    d="M21.75 15.5a9.75 9.75 0 01-11.25-13
    9 9 0 1011.25 13z"/>
`;

const sun = `
<circle
    cx="12"
    cy="12"
    r="5"
    stroke="currentColor"
    stroke-width="2"
    fill="none"/>
<line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/>
<line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/>
<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/>
<line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/>
<line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/>
<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/>
<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/>
`;



/* ===== 主題切換 ===== */

if (localStorage.theme === "light")
{
    html.setAttribute("data-theme", "light");
    if (themeIcon) themeIcon.innerHTML = sun;
}
else
{
    if (themeIcon) themeIcon.innerHTML = moon;
}

if (themeToggle)
{
    themeToggle.onclick = () =>
    {
        if (html.getAttribute("data-theme"))
        {
            html.removeAttribute("data-theme");
            localStorage.theme = "dark";
            if (themeIcon) themeIcon.innerHTML = moon;
        }
        else
        {
            html.setAttribute("data-theme", "light");
            localStorage.theme = "light";
            if (themeIcon) themeIcon.innerHTML = sun;
        }
    };
}



/* ===== 側邊欄摺疊 ===== */

document.querySelectorAll(".sidebar-toggle").forEach((btn) =>
{
    btn.onclick = () =>
    {
        btn.parentElement.classList.toggle("closed");
    };
});



/* ===== TOC 生成 ===== */

function generateTOC(target, toc)
{
    if (!target || !toc) return;

    toc.innerHTML = "";

    const headers = target.querySelectorAll("h2, h3");

    headers.forEach((header, idx) =>
    {
        const id = `heading-${idx}`;
        header.id = id;

        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = `#${id}`;
        a.textContent = header.innerText;

        li.appendChild(a);

        if (header.tagName === "H3")
        {
            li.style.marginLeft = "16px";
        }

        toc.appendChild(li);
    });
}



/* ===== Markdown 載入與解析 ===== */

async function loadMarkdown(postName)
{
    const target = document.getElementById("markdown-body");
    const toc = document.getElementById("toc");

    if (!target) return;

    try
    {
        const response = await fetch(`posts/${postName}.md`);

        if (!response.ok)
        {
            throw new Error("File not found");
        }

        const mdText = await response.text();

        target.innerHTML = marked.parse(mdText);

        generateTOC(target, toc);

        window.scrollTo(0, 0);
    }
    catch (err)
    {
        target.innerHTML = `
            <h1>404 NOT FOUND</h1>
            <p>connect adminer @chen971023@gmail.com</p>
        `;

        if (toc) toc.innerHTML = "";
    }
}



/* ===== 綁定左側文章連結 ===== */

document.querySelectorAll(".nav-link").forEach((link) =>
{
    link.onclick = (e) =>
    {
        e.preventDefault();

        const post = link.getAttribute("data-post");

        if (post)
        {
            loadMarkdown(post);
        }
    };
});



/* ===== 預設載入第一篇 ===== */

loadMarkdown("whoami");



/* ===== Search 快捷鍵 ===== */

document.addEventListener("keydown", (e) =>
{
    if (e.ctrlKey && e.key === "k")
    {
        e.preventDefault();

        const searchInput = document.getElementById("search-input");

        if (searchInput)
        {
            searchInput.focus();
        }
    }
});