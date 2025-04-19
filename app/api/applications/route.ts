import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    const supabase = await createClient();
    const { data, error, count } = await supabase
      .from('applications')
      .select('*', { count: 'exact' })
      .match(category ? { category } : {})
      .or(search ? `name.ilike.%${search}%,description.ilike.%${search}%` : '')
      .order('name', { ascending: sort === 'name_asc' })
      .range(offset, offset + limit - 1);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      data,
      page,
      limit,
      total: count || 0
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const json = await req.json();
    const {
      name,
      logo_url,
      category_id,
      sub_category_id,
      type,
      website_url,
      summary,
      key_features,
      pricing_details,
    } = json;

    const { data, error } = await supabase
      .from('applications')
      .insert([
        {
          name,
          logo_url,
          category_id,
          sub_category_id,
          type,
          website_url,
          summary,
          key_features,
          pricing_details,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in applications POST:', error);
    return NextResponse.json(
      { error: 'Error creating application' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const json = await req.json();
    const { id, ...updates } = json;

    const { data, error } = await supabase
      .from('applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in applications PUT:', error);
    return NextResponse.json(
      { error: 'Error updating application' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Application ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in applications DELETE:', error);
    return NextResponse.json(
      { error: 'Error deleting application' },
      { status: 500 }
    );
  }
} 