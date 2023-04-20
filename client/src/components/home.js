import {  Header, Grid, Image } from "semantic-ui-react"

export default function Home() {
    return(
      <div>
        <Header vertical>Featured Items:</Header>
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


        <Grid.Row>
          <Grid>
            <Grid.Column width={6}>
             <div>Our Coffee</div>
            </Grid.Column>
            <Grid.Column width={8}>
              cofee image
              {/* <img src="https://images.unsplash.com/photo-1574728015355-8b350afff15f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80" alt="barista making coffee"/> */}
            </Grid.Column>
          </Grid>
        </Grid.Row>
      </div>
    )}