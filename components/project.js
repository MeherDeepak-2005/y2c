import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Image,
  SimpleGrid,
  GridItem
} from '@chakra-ui/react';

function project() {
  return <Box>
    <Heading w='100%' textAlign='center'>
      Project Updates
    </Heading>
    <SimpleGrid spacing={[0,10]} maxW='90%' m='auto' mt={10} columns={[1,1,2]} rows={[2,2,1]}>
      <GridItem colSpan={1} rowSpan={1}>
        <motion.img initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={{
            visible: { opacity: 1, x:0,y:0 },
            hidden: { opacity: 0, x:-40,y:20 }
      }} style={{width:'100%', height:'80%', objectFit:'cover'}} src='https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'>
        </motion.img>
      </GridItem>
      <GridItem colSpan={1} rowSpan={1}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y:40 }
          }}>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem eaque voluptate nostrum odit sit amet veritatis omnis sequi, enim corrupti minima molestias officiis eveniet. Facere alias ratione cumque! Similique, rerum.
            Numquam, repellat voluptatem nisi asperiores praesentium quisquam? A illo temporibus autem, quia expedita assumenda dolore, ut totam exercitationem, laboriosam animi suscipit. Aspernatur itaque quia velit quam voluptate modi est blanditiis!
          </Text>
        </motion.div>
      </GridItem>
    </SimpleGrid>
  </Box>;
}

export default project;
