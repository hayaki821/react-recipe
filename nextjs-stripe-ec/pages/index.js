import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Stack, Button } from 'react-bootstrap';

export async function getStaticProps() {
  const products = await fetch('http://localhost:3000/api/products').then(
    response => response.json()
  );
  return {
    props: {
      products,
    },
    revalidate: 1 * 60, // 1分
  };
}

export default function Home({ products }) {
  return (
    <main>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Stack gap={3}>
          {products.map(product => {
            return (
              <Row key={product.id}>
                <Col xs={4}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    style={{ maxWidth: '100%' }}
                  />
                </Col>
                <Col>
                  <Stack gap={3}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                  </Stack>
                  <Stack direction="horizontal">
                    {product.prices.map(price => {
                      return (
                        <dl key={price.id}>
                          <dt>価格</dt>
                          <dd>
                            <span>
                              {price.unit_amount.toLocaleString()}{' '}
                              {price.currency.toLocaleUpperCase()}
                            </span>
                            {price.transform_quantity ? (
                              <small>
                                ({price.transform_quantity.divide_by}アイテム毎)
                              </small>
                            ) : null}
                          </dd>
                          <dd>
                            <Button>注文する</Button>
                          </dd>
                        </dl>
                      );
                    })}
                  </Stack>
                </Col>
              </Row>
            );
          })}
        </Stack>
      </Container>
    </main>
  );
}
