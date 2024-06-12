const Product = require("../modules/ProductModule");

exports.create = async (req, res, next) => {
    try {
        const { title, category, subcategory, price, salePercentage, des, isBestSeller, star, color, sizes, manufatures, instock, img, listImg  } = req.body;
        if(title && category && subcategory && price && des && star && color  &&  sizes &&  manufatures && instock && img) {
            await Product.create({
                title,
                category,
                subcategory,
                price,
                salePercentage,
                des,
                isBestSeller,
                star,
                color,
                sizes,
                manufatures,
                instock,
                img,
                listImg
            })

            return res.status(200).json({
                message: 'Create product success'
            })
        } else {
            return res.status(400).json({
                message: 'Create product fail'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};

exports.search = async (req, res) => {
    const { category, subcategory, price, mastercolor, mastersize, page, limit } = req.body;
    const pageCurrent = parseInt(page) || 1;
    const itemsPerPage = parseInt(limit) || 10;
    console.log('sub', req.body);
    console.log('query', req.query);


    let from, to;
    if (price) {
        const convetPrice = price.split('-');
        from = parseFloat(convetPrice[0]);
        to = parseFloat(convetPrice[1]);
    }

    try {
        let findProduct = await Product.find();
        
        findProduct = await findProduct.filter(product => {
            let matches = true;

            if (category && category.length > 0) {
                matches = matches && (Array.isArray(category) ? category.some(cate => product.category.includes(cate)) : product.category.includes(category));
            }

            if (subcategory && subcategory.length > 0) {
                // matches = matches && product.subcategory.toLowerCase().includes(subcategory)
                matches = matches && (Array.isArray(subcategory) ? subcategory.some(cate => product.subcategory.includes(cate)  || product.title.includes(cate)) : product.category.includes(subcategory) || product.title.includes(subcategory));
            }

            if (to) {
                const productPrice = product.price - (product.price * product.salePercentage / 100);
                matches = matches && from <= productPrice && productPrice <= to;
            }

            if (mastercolor && mastercolor.length > 0) {
                matches = matches && (Array.isArray(mastercolor) ? mastercolor.some(cate => product.color.includes(cate)) : product.color.includes(mastercolor));
            }
            if (mastersize && mastersize.length > 0) {
                matches = matches && (Array.isArray(mastersize) ? mastersize.some(cate => product.sizes.includes(cate)) : product.sizes.includes(mastersize));
            }
            return matches;
        });

        const totalLength = findProduct.length;
        const start = (pageCurrent - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, totalLength);

        const paginatedProducts = findProduct.slice(start, end);

        return res.status(200).json({
            data: paginatedProducts,
            length: totalLength
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

// is best seller 

exports.bestseller = async (req, res) => {
    try {
        const product = await Product.find({ isBestSeller: true });
        return res.status(200).json({
            data: product,
            length: product.length
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

// get all category 
exports.categorys = async (req, res) => {
    try {
        const products = await Product.find(); // Wait for the products to be fetched
        const uniqueCategories = new Set();

        products.forEach((product) => {
            if(product.category !== 'all') {
                uniqueCategories.add(product.category);
            }
        });

        const listCategory = Array.from(uniqueCategories);

        res.status(200).json({
            categorys: listCategory
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// manufactures
exports.manufactures = async (req, res) => {
    try {
        const products = await Product.find(); // Wait for the products to be fetched
        const uniqueCategories = new Set();

        products.forEach((product) => {
            if(product.manufatures) {
                uniqueCategories.add(product.manufatures);
            }
        });

        const listCategory = Array.from(uniqueCategories);

        res.status(200).json({
            manufactures: listCategory
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// detail product
exports.detail = async (req, res) => {
    const { code } = req.body;
    const product = await Product.findOne({ code });
    if (!product) {
        return res.status(400).json({
            product: null,
            success: false
        })
    }

    return res.status(200).json({
        product,
        success: true
    })


}


