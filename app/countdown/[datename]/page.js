export default function DateNamePage({params}){
    const dateName = decodeURIComponent(params.datename);
    return (
        <>
            {dateName}
        </>
    )
}