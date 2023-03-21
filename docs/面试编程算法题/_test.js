const parseURL = (url) => {
    const o = new URL(url);
    const search = {};
    for(let [key, value] of o.searchParams.entries()) {
        search[key] = value;
    }
    return {
        domain: o.host,
        pathname: o.pathname,
        search
    }
}

const url = 'https://segmentfault.com/a/1190000012113011?utm_source=tag-newest&name=Duke#123';
console.log(parseURL(url));