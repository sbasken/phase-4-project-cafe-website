import {  Header, Grid, Image } from "semantic-ui-react"

export default function Home() {
    return(
      <div>
        <Header vertical>Featured Items:</Header>
        {/* <Segment.Group horizontal>
          <Segment textAlign='center'>
            <Header icon class>
            <Icon name='coffee' />
            Item Details
            </Header>
          </Segment>
          <Segment textAlign='center'>
            <Header icon>
            <Icon name='coffee' />
            Item Details
            </Header>
          </Segment>
          <Segment textAlign='center'>
            <Header icon>
            <Icon name='coffee' />
            Item Details
            </Header>
          </Segment>
        </Segment.Group> */}

        <Grid columns={3} divided>
        <Grid.Row textAlign="center">
          <Grid.Column>
            <Image centered size="medium" src='https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=828&q=80' />
            <h3 >Item Detail</h3>
          </Grid.Column>
          <Grid.Column>
            <Image centered size="medium" src='https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=828&q=80' />
            <h3>Item Detail</h3>
          </Grid.Column>
          <Grid.Column>
            <Image centered size="medium" src='https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=828&q=80' />
            <h3>Item Detail</h3>
          </Grid.Column>
        </Grid.Row>
        </Grid>


        <div>Our Coffee</div>
        <div>Coffee pics</div>
      </div>
    )}