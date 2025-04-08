import HandshakeCreationForm from '@/_ui/handshake-creation-form'
import PageHeader from '@/_ui/page-header'

export default function Page() {
  return (
      <div className="flex items-center justify-center">
        <PageHeader
        title="Create Handshake"
        subTitle = "Create and initiate a new handshake"
        />
        <HandshakeCreationForm />
      </div>

  );
}
 
