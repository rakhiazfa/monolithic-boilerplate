import Page from '@/components/container/page';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { Card, CardBody } from '@nextui-org/card';
import Form from './form';

export default function Menus() {
    const breadcrumbs = [{ name: 'Menus', href: '/iam/menus' }, { name: 'Create Menu' }];

    return (
        <Page title="Create Menu">
            <main>
                <section className="app-container">
                    <Breadcrumbs breadcrumbs={breadcrumbs} className="mb-5" />
                    <div>
                        <h1 className="app-page-title mb-7">Create Menu</h1>
                    </div>
                    <Card>
                        <CardBody className="p-5">
                            <Form />
                        </CardBody>
                    </Card>
                </section>
            </main>
        </Page>
    );
}
