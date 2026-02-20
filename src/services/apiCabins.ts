import supabase from "./supabase";
import toast from "react-hot-toast";

//---------------------------------------
//READ(DOWNLOAD) data from table Cabins (Supabase)
//---------------------------------------
export async function getCabins() {

	//-----Code from Supabase doc-----
	let { data, error } = await supabase
	.from('cabins')
	.select('*') 
	.order("created_at", { ascending: true });
	//--------------------------------------

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}



//---------------------------------------
//DELETE 1 case in table Cabins(Supabase)
//---------------------------------------

export type CabinType = {
	id?: number;
	created_at?: string;
	name: string;
	maxCapacity: number;
	regularPrice: number;
	discount: number;
	description: string;
	image: string;
  };
  
  export type AddCabinInputType = Omit<CabinType, "created_at" | "image"> & {
	image: string | File;
  };
  
  

export async function deleteCabin(cabin: CabinType) {

	//-----Code from Supabase doc-----
	const { data, error } = await supabase
	.from('cabins')
	.delete()
	.eq('id', cabin.id)
	//--------------------------------------
	
	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}

	//Delete image from supabase storage
	const { error: deleteError } = await supabase.storage
    .from("cabin-images")
    .remove([cabin.image.split("/").pop()!]); 
	//= url adress split by /, last part (name of img) is used for identifying img in storage

	if (deleteError) {
		toast.error("We couldnt delete the image from the database.");
	}
	
	return data;
}



//---------------------------------------
//Add 1 case to Supabase Cabins:
//---------------------------------------
export async function addCabin(newCabin: AddCabinInputType) {

	const usingOldImg = typeof newCabin.image === "string";

	let imageUniqueName = "";
	if (typeof newCabin.image !== "string") {
		 imageUniqueName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
	  }
	  
	
	const imageCompletePath = usingOldImg ? newCabin.image : `https://tmmduhcwahllfauqhkuj.supabase.co/storage/v1/object/public/cabin-images/${imageUniqueName}` 
	


	//---Code from Supabase doc (upload image)--
	if(!usingOldImg){
		const { error: imgError } = await supabase
		.storage
		.from('cabin-images')
		.upload(imageUniqueName, newCabin.image)
		//-----------

		if(imgError) {
			throw new Error("Obrázek nemohl být nahrán, pokoj nebyl přidán.");
		}
	}

	const { data, error } = await supabase
	.from('cabins')
	.insert([{...newCabin, image: imageCompletePath}])
	.select() 

		
	if (error) {
		console.error(error);
		throw new Error("Cabin could not be added");
	}
	
	return data;
}



//---------------------------------------
//EDIT 1 case in table Cabins(Supabase):
//---------------------------------------
export async function editCabin(newCabin: CabinType, oldImgUrl: string, image: string | File){

	const newImageUploaded = typeof image !== "string";

	let newImageUrl = "";

	if (newImageUploaded) {
		// User uploaded new picture
	
		//Create unique name
		const imageUniqueName = `${Math.random()}-${image.name}`.replaceAll("/", "")
		
		const { error: imgError } = await supabase.storage
		.from('cabin-images')
		.upload(imageUniqueName, image)

		if(imgError) {
			throw new Error("Obrázek nemohl být nahrán, pokoj nebyl upraven.");
		}

		newImageUrl = `https://tmmduhcwahllfauqhkuj.supabase.co/storage/v1/object/public/cabin-images/${imageUniqueName}`
	  } 

	  
	const { data, error } = await supabase
	.from('cabins')
	.update({ ...newCabin, image: newImageUploaded ? newImageUrl : newCabin.image })
	.eq('id', newCabin.id)
	.select()

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be editted");
	}

	if (newImageUploaded) {
		//Delete old img from supabase storage
		const { error: changeImgError } = await supabase.storage
		.from("cabin-images")
		.remove([oldImgUrl.split("/").pop()!]); 

		if (changeImgError) {
			toast.error("We couldnt delete the image from the database");
		}
	}

	return data;
}