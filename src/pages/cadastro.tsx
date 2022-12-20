import { useProduct } from '@/hooks/useProduct';
import { Container } from '@/styles/pages/Cadastro';
import React from 'react';
import { useForm } from 'react-hook-form';

// import { Container } from './styles';

const Cadastro: React.FC = () => {
  const { categories, createProduct } = useProduct();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function handleCreateSubCategory(data: any) {
    const { Nome, ID } = data;
    const gameSpecifications = {};

    console.log({ Nome, ID });
  }

  async function handleCreateProduct(fields: any) {
    const {
      category_id,
      sub_category_id,
      name,
      description,
      price,
      banner,
      quantity,
      developer,
      genre,
      publisher,
      languages,
      releaseDate,
      subtitles,
      age,
      numberOfPlayersOffline,
      numberOfPlayersOnline,
    } = fields;
    const gameSpecifications = {
      developer,
      age,
      subtitles,
      releaseDate,
      languages,
      publisher,
      genre: genre.split(`,`),
      numberOfPlayersOnline,
      numberOfPlayersOffline,
    };

    const data = {
      name,
      description,
      category_id,
      sub_category_id,
      price: Number(price),
      banner,
      quantity,
      gameSpecifications,
    };

    const response = await createProduct(
      name,
      description,
      Number(price),
      gameSpecifications,
      banner,
      category_id,
      sub_category_id,
      Number(quantity),
    );

    alert(response);
  }
  return (
    <>
      {/* <Container>
        <h1>Criar sub Categoria</h1>
        <form onSubmit={handleSubmit(handleCreateSubCategory)}>
          <input type="text" {...register(`Nome`)} placeholder="Nome" />
          <input type="text" {...register(`ID`)} placeholder="ID" />

          <button type="submit" className="site-button">
            Criar
          </button>
        </form>
      </Container> */}
      <Container>
        <h1>Criar sub Categoria</h1>
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <select {...register(`category_id`)}>
            <option value="0">Categoria</option>
            {categories.map((item) => (
              <option key={item.id} value={item.category_id}>
                {item.name}
              </option>
            ))}
          </select>

          <select {...register(`sub_category_id`)}>
            <option value="0">SubCategorias</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <input type="text" {...register(`name`)} placeholder="nome" />
          <input
            type="text"
            {...register(`description`)}
            placeholder="descrição"
          />
          <input type="text" {...register(`price`)} placeholder="Preço" />

          <input
            type="text"
            {...register(`developer`)}
            placeholder="developer"
          />
          <input type="text" {...register(`genre`)} placeholder="genre" />
          <input
            type="text"
            {...register(`publisher`)}
            placeholder="publisher"
          />
          <input
            type="text"
            {...register(`languages`)}
            placeholder="languages"
          />
          <input
            type="text"
            {...register(`releaseDate`)}
            placeholder="releaseDate"
          />
          <input
            type="text"
            {...register(`subtitles`)}
            placeholder="subtitles"
          />
          <input type="text" {...register(`age`)} placeholder="age" />
          <input
            type="text"
            {...register(`numberOfPlayersOffline`)}
            placeholder="numberOfPlayersOffline"
          />
          <input
            type="text"
            {...register(`numberOfPlayersOnline`)}
            placeholder="numberOfPlayersOnline"
          />

          <input type="text" {...register(`banner`)} placeholder="banner" />
          <input type="text" {...register(`quantity`)} placeholder="quantity" />

          <button type="submit" className="site-button">
            Criar
          </button>
        </form>
      </Container>
    </>
  );
};

export default Cadastro;
