import HandshakeCreationForm from '@/_ui/handshake-creation-form'
import PageHeader from '@/_ui/page-header'

export default function Page() {
  return (
      <div className="flex flex-col items-center justify-top min-h-screen">
        <PageHeader
        title="Create Handshake"
        subTitle = "Create and initiate a new handshake"
        />
        <HandshakeCreationForm />
      </div>

  );
}
 
