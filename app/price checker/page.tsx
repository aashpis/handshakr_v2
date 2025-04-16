import PageHeader from "@/_ui/page-header"


export default function Page() {
    return (
        <div>
           
            <div className="flex flex-col items-center justify-top min-h-screen">
                <PageHeader
                    title="Received Handshake"
                    subTitle="Handshakes you have received that need to be accepted or rejected"
                />
            
            </div>
        </div>

    );
}