export default function footer() {

    function backToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <footer className="footer">
            <div className="go-back">
                <button onClick={() => backToTop()}>Go to the top</button>
            </div>
            <h3>OmniMart</h3>
            <p>© 2023 OmniMart.com</p>
            <p>produced by: José Leite</p>
        </footer>
    )
}