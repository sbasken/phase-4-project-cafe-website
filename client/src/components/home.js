import React, { useEffect, useState } from 'react';
import { Header, Grid, Image, Card, SegmentInline, Segment } from 'semantic-ui-react';
import '../App.css';

export default function Home() {
  const [featuredItems, setFeaturedItems] = useState([]);

  useEffect(() => {
    fetch("/menu")
      .then(response => response.json())
      .then(data => {
        setFeaturedItems(getRandomItems(data, 3));
      })
      .catch(error => console.error(error));
  }, []);

  function getRandomItems(items, count) {
    const shuffled = items.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  return (
    <div>
      <Header as="h2" textAlign="center">Featured Items:</Header>
      <Grid columns={3} centered>
        <Grid.Row stretched>
          {featuredItems.map(item => (
            <Grid.Column key={item.id} mobile={16} tablet={8} computer={5}>
              <Card centered fluid>
                <Image centered size="medium" 
                src={item.img_url} 
                style={{ width: '100%', height: '80%', objectFit: 'cover' }}/>
                <Card.Content textAlign="center">
                  <Card.Header>{item.name}</Card.Header>
                  <Card.Meta>{item.price}</Card.Meta>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Header as="h2">Our Coffee</Header>
            <Segment>At Binary Beans Cafe, we're passionate about coffee and committed to serving only the highest quality brews to our customers. We believe that coffee is an art form, and we take great pride in every cup that we serve.
            <br/>
            <br/>
            We start by carefully selecting our coffee beans from the best growers around the world. We're dedicated to sourcing only the finest and most flavorful beans, which are then roasted in-house to bring out their unique flavors and aromas. Our small-batch roasting process ensures that each cup of coffee is fresh, aromatic, and bursting with flavor.
            <br/>
            <br/>
            Our dedication to quality extends beyond just our coffee beans. We also offer a variety of fresh-made food and pastries that are baked daily in-house. Our menu includes a range of breakfast and lunch options, from savory quiches to sweet pastries and hearty sandwiches.
            <br/>
            <br/>
            When it comes to brewing our coffee, we take great care to ensure that each cup is made with the utmost precision and attention to detail. We use only the best equipment and techniques to brew our coffee, whether you prefer a classic drip coffee, a rich and creamy latte, or a refreshing iced coffee.
            <br/>
            <br/>
            So if you're looking for a cozy, welcoming atmosphere where you can enjoy a perfectly brewed cup of coffee and a delicious pastry, come visit us at Binary Beans Cafe. We're confident that our commitment to quality and our passion for coffee will make your experience truly exceptional.
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Image src="https://images.unsplash.com/photo-1574728015355-8b350afff15f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80" alt="barista making coffee" floated="right"/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
    )}